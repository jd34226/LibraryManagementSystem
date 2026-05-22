package mgt.library.book.service;

import mgt.library.book.model.Book;
import mgt.library.book.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found with id " + id));
    }

    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    public Book updateBook(Long id, Book updatedBook) {
        Book existing = getBookById(id);

        if (updatedBook.getTitle() != null) {
            existing.setTitle(updatedBook.getTitle());
        }
        if (updatedBook.getAuthor() != null) {
            existing.setAuthor(updatedBook.getAuthor());
        }
        if (updatedBook.getGenre() != null) {
            existing.setGenre(updatedBook.getGenre());
        }
        if (updatedBook.getYear() != null) {
            existing.setYear(updatedBook.getYear());
        }
        if (updatedBook.getAvailability() != null) {
            existing.setAvailability(updatedBook.getAvailability());
        }

        return bookRepository.save(existing);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new RuntimeException("Book not found with id " + id);
        }
        bookRepository.deleteById(id);
    }

    public List<Book> searchBooks(Long id, String title, String author, String genre, Integer year, Boolean availability) {
        return bookRepository.searchBooks(id, title, author, genre, year, availability);
    }
}
