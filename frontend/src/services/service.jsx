const endPoint = import.meta.env.VITE_ENDPOINT;
const Firebase_Link = import.meta.env.VITE_FIREBASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
const image = import.meta.env.VITE_IMAGE_URL;

// Confirm verification
export async function checkEmailVerification(token) {
  const url = `${Firebase_Link}/accounts:lookup?key=${API_KEY}`;
  const ops = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken: token }),
  };

  return await apiRequest(url, ops);
}

// Send verification email
export async function SendVerificationMail(token) {
  const url = `${Firebase_Link}/accounts:sendOobCode?key=${API_KEY}`;
  const ops = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requestType: "VERIFY_EMAIL", idToken: token }),
  };

  return await apiRequest(url, ops);
}

// Login
export async function LoginWithEmailPwd(mail, pwd) {
  const url = `${Firebase_Link}/accounts:signInWithPassword?key=${API_KEY}`;
  const ops = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: mail,
      password: pwd,
      returnSecureToken: true,
    }),
  };

  return await apiRequest(url, ops);
}

// Signup
export async function SignupWithEmailPwd(uname, mail, pwd) {
  const url = `${Firebase_Link}/accounts:signUp?key=${API_KEY}`;
  const ops = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: uname,
      email: mail,
      password: pwd,
      returnSecureToken: true,
    }),
  };

  return await apiRequest(url, ops);
}

// Books by category
export async function getBookByCategory(category, offset = 0) {
  const url = `${endPoint}/subjects/${category}.json?limit=12&offset=${offset}`;

  try {
    const resp = await fetch(url, { method: "GET" });

    if (!resp.ok) {
      console.error(`Failed to fetch data: ${resp.status}`);
      return [];
    }
    const data = await resp.json();
    if (data.works) {
      return data.works;
    } else {
      console.error("No books found for this category");
      return [];
    }
  } catch (error) {
    console.error("Error fetching books", error);
    return [];
  }
}

// Specific book info
export async function fetchBookByIsbn(bukId, bukCover) {
  try {
    let bookData = null;
    if (bukId.startsWith("/works/")) {
      const res = await fetch(`${endPoint}${bukId}/editions.json`);
      const data = await res.json();
      const { isbn_10, isbn_13 } = data?.entries[0] || data?.entries[1];
      const info =
        isbn_10 ||
        isbn_13 ||
        data.entries[1]?.isbn_10 ||
        data.entries[1]?.isbn_13;

      if (info) {
        const bookRes = await fetch(
          `${endPoint}/api/books?bibkeys=ISBN:${info}&format=json&jscmd=data`
        );
        const bookDataResponse = await bookRes.json();
        bookData = bookDataResponse[`ISBN:${info}`];
      }
    } else {
      const bookRes = await fetch(
        `${endPoint}/api/books?bibkeys=ISBN:${bukId}&format=json&jscmd=data`
      );
      const bookDataResponse = await bookRes.json();
      bookData = bookDataResponse[`ISBN:${bukId}`];
    }

    if (!bookData) {
      console.error("No book data found");
      return null;
    }

    const { authors, cover, excerpts, publish_date, publishers, title } =
      bookData;
    const img = cover ? cover.large : `${image}/${bukCover}-L.jpg`;

    return {
      title,
      authors:
        authors?.map((author) => author.name).join(", ") || "Unknown Author",
      cover: img,
      excerpts: excerpts || ["No excerpts available"],
      publish_date: publish_date || "Unknown",
      publishers:
        publishers?.map((publ) => publ.name).join(", ") || "Unknown Publishers",
    };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

// API_HANDLER
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage;

      try {
        const e = await response.json();
        errorMessage = e.error?.message || `Error! status: ${response.status}`;
      } catch (err) {
        errorMessage = `HTTP error! status: ${response.status}`;
      }

      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message);
  }
}
