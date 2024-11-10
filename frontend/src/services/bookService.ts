const endpoint = 'https://openlibrary.org/subjects';

type Book = {
    title: string;
    cover_id: string;
    key: string;
    availability: { isbn?: string };
};

type BookData = {
    authors: { name: string }[];
    cover: { large: string };
    excerpts: string[];
    publish_date: string;
    publishers: { name: string }[];
    title: string;
};

// Books by category
export async function getBookByCategory(category: string): Promise<Book[]> {
    const url = `${endpoint}/${category}.json?limit=10&offset=0`;

    try {
        const resp = await fetch(url, { method: 'GET' });

        if (!resp.ok) {
            console.error(`Failed to fetch data: ${resp.status}`);
            return [];
        }

        const data = await resp.json();
        if (data.works) {
            return data.works;
        } else {
            console.error('No books found for this category');
            return [];
        }
    } catch (error) {
        console.error('Error fetching books', error);
        return [];
    }
}

// Specific book info
export async function fetchBookByIsbn(bukId: string, bukCover: string) {
    try {
      let bookData: BookData | null = null;
  
      if (bukId.startsWith('/works/')) {
        const res = await fetch(`https://openlibrary.org${bukId}/editions.json`);
        const data = await res.json();
        const { isbn_10, isbn_13 } = data?.entries[0] || data?.entries[1];
        const info = isbn_10 || isbn_13 || data.entries[1]?.isbn_10 || data.entries[1]?.isbn_13;
  
        if (info) {
          const bookRes = await fetch(
            `https://openlibrary.org/api/books?bibkeys=ISBN:${info}&format=json&jscmd=data`
          );
          const bookDataResponse = await bookRes.json();
          bookData = bookDataResponse[`ISBN:${info}`];
        }
      } else {
        const bookRes = await fetch(
          `https://openlibrary.org/api/books?bibkeys=ISBN:${bukId}&format=json&jscmd=data`
        );
        const bookDataResponse = await bookRes.json();
        bookData = bookDataResponse[`ISBN:${bukId}`];
      }
  
      if (!bookData) {
        console.error('No book data found');
        return null;
      }
  
      const { authors, cover, excerpts, publish_date, publishers, title } = bookData;
      const img = cover ? cover.large : `https://covers.openlibrary.org/b/id/${bukCover}-L.jpg`;

      return {
        title,
        authors: authors?.map(author => author.name).join(', ') || 'Unknown Author',
        cover: img,
        excerpts: excerpts || ['No excerpts available'],
        publish_date: publish_date || 'Unknown',
        publishers: publishers?.map(publ => publ.name).join(', ') || 'Unknown Publishers',
      };
    } catch (error) {
      console.error('Error fetching book data:', error);
      return null;
    }
  }
  


