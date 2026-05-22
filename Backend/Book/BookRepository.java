package mgt.library.book.repository;

import mgt.library.book.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

	@Query("SELECT b FROM Book b WHERE " +
		       "(:id IS NULL OR b.id = :id) AND " +
		       "(:title IS NULL OR (b.title IS NOT NULL AND LOWER(b.title) LIKE LOWER(CONCAT('%', :title, '%')))) AND " +
		       "(:author IS NULL OR (b.author IS NOT NULL AND LOWER(b.author) LIKE LOWER(CONCAT('%', :author, '%')))) AND " +
		       "(:genre IS NULL OR LOWER(b.genre) = LOWER(:genre)) AND " +
		       "(:year IS NULL OR b.year = :year) AND"+
	           "(:availability IS NULL OR b.availability = :availability)")
		List<Book> searchBooks(@Param("id") Long id,
		                       @Param("title") String title,
		                       @Param("author") String author,
		                       @Param("genre") String genre,
		                       @Param("year") Integer year,
							   @Param("availability") Boolean availability);

	}
