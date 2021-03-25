package biblioteka.contoller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import biblioteka.repository.AutorRepository;
import biblioteka.repository.FormatRepository;
import biblioteka.repository.KategorijaRepository;
import biblioteka.repository.KnjigaKategorijaRepository;
import biblioteka.repository.KnjigaRepository;
import model.Autor;
import model.Format;
import model.Kategorija;
import model.Knjiga;
import model.KnjigaKategorija;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/bookController")
public class KnjigaController {

	@Autowired
	KnjigaRepository kr;

	@Autowired
	AutorRepository ar;

	@Autowired
	KategorijaRepository katr;

	@Autowired
	KnjigaKategorijaRepository kkr;

	@Autowired
	FormatRepository fr;

	@GetMapping("/getAllBooks")
	public List<Knjiga> vratiSveKnjige() {
		return kr.findAll();
	}

	@GetMapping("/getBook")
	public Knjiga vratiKnjigu(@RequestParam("id") int id) {
		Knjiga k = kr.findById(id).get();
		if (k.getSlika() != null) {
			byte[] slika = decompress(k.getSlika());
			k.setSlika(slika);
		}
		return k;
	}

	@GetMapping("/getBooksByFormat")
	public List<Knjiga> vratiKnjigePoFormatu(@RequestParam("id") int id) {
		Format f = fr.findById(id).get();
		return kr.findByFormat(f);
	}

	@PostMapping("/saveBook")
	public Knjiga sacuvajKnjigu(@RequestBody Knjiga knjiga) {
		return kr.save(knjiga);
	}

	@PutMapping("/addPicture")
	public Knjiga dodajSliku(@RequestParam("id") int id, @RequestParam("slikaKnjige") MultipartFile slika) {
		Knjiga knjiga = kr.findById(id).get();
		if (slika != null) {
			try {
				System.out.println("Original image byte size - " + slika.getBytes().length);
				knjiga.setSlika(compress(slika.getBytes()));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return kr.save(knjiga);
	}

	/*@PutMapping("/addFile")
	public Knjiga dodajFajl(@RequestParam("id") int id, @RequestParam("fajlKnjige") MultipartFile fajl) {
		Knjiga knjiga = kr.findById(id).get();
		if (fajl != null) {
			try {
				System.out.println("Original file byte size - " + fajl.getBytes().length);
				knjiga.setFajl(compress(fajl.getBytes()));
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return kr.save(knjiga);
	}*/

	public static byte[] compress(byte[] data) {
		Deflater def = new Deflater();
		def.setInput(data);
		def.finish();
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		while (!def.finished()) {
			int count = def.deflate(buffer);
			outputStream.write(buffer, 0, count);
		}
		try {
			outputStream.close();
		} catch (IOException e) {
			System.out.println("Nesto je puklo");
			e.printStackTrace();
		}
		System.out.println("Compressed:" + outputStream.toByteArray().length);
		return outputStream.toByteArray();
	}

	public static byte[] decompress(byte[] data) {
		Inflater inf = new Inflater();
		inf.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inf.finished()) {
				int count = inf.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DataFormatException e) {
			e.printStackTrace();
		}
		return outputStream.toByteArray();
	}

	@GetMapping("/getAllAuthors")
	public List<Autor> vratiSveAutore() {
		return ar.findAll();
	}

	@GetMapping("/getAuthor")
	public Autor vratiAutora(@RequestParam("id") int id) {
		return ar.findById(id).get();
	}

	@PostMapping("/saveAuthor")
	public Autor sacuvajAutora(@RequestBody Autor a) {
		return ar.save(a);
	}

	@GetMapping("/getAllFormats")
	public List<Format> vratiSveFormate() {
		return fr.findAll();
	}

	@GetMapping("/getFormat")
	public Format vratiFormat(@RequestParam("id") int id) {
		return fr.findById(id).get();
	}

	@GetMapping("/getAllCategories")
	public List<Kategorija> vratiSveKategorije() {
		return katr.findAll();
	}

	@PostMapping(value = "/chooseCategories")
	public void odaberiKategorije(@RequestParam("id") int knjigaID, @RequestBody Kategorija[] kategorije) {
		Knjiga knjiga = kr.findById(knjigaID).get();
		for (int i = 0; i < kategorije.length; i++) {
			KnjigaKategorija kk = new KnjigaKategorija();

			kk.setKnjiga(knjiga);
			Kategorija kategorija = kategorije[i];
			kk.setKategorija(kategorija);

			kkr.save(kk);
		}
	}

	@GetMapping("/getCategory")
	public Kategorija vratiKategoriju(@RequestParam("id") int id) {
		return katr.findById(id).get();
	}

}
