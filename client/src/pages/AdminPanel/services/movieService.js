const API_URL = import.meta.env.VITE_API_URL;

const parseJsonResponse = async (response) => {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return null;
};

export const buildFileUrl = (filePath) => {
  if (!filePath) return "";
  if (filePath.startsWith("http://") || filePath.startsWith("https://")) {
    return filePath;
  }
  const normalizedPath = filePath.startsWith("/") ? filePath : `/${filePath.replaceAll("\\", "/")}`;
  return `${API_URL}${normalizedPath}`;
};

export async function createMovie(formData) {
  const response = await fetch(`${API_URL}/api/movies`, {
    method: "POST",
    body: formData,
  });

  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(
      data?.errors?.join(", ") ||
        data?.message ||
        data?.error ||
        "Не вдалося додати фільм"
    );
  }

  return data;
}

export async function getMovies() {
  const response = await fetch(`${API_URL}/api/movies`);
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || "Не вдалося завантажити фільми");
  }

  return data || [];
}

export async function getMovieById(id) {
  const response = await fetch(`${API_URL}/api/movies/${id}`);
  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || "Не вдалося завантажити фільм");
  }

  return data;
}

export async function deleteMovie(id) {
  const response = await fetch(`${API_URL}/api/movies/${id}`, {
    method: "DELETE",
  });

  const data = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(data?.message || "Не вдалося видалити фільм");
  }

  return data;
}

export async function updateMovie(id, data, isFormData = false) {
  const response = await fetch(`${API_URL}/api/movies/${id}`, {
    method: "PATCH",
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body: isFormData ? data : JSON.stringify(data),
  });

  const responseData = await parseJsonResponse(response);

  if (!response.ok) {
    throw new Error(
      responseData?.errors?.join(", ") ||
        responseData?.message ||
        responseData?.error ||
        "Не вдалося оновити фільм"
    );
  }

  return responseData;
}
