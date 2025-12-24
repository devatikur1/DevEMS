export async function UploadImage(file) {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const apiKey = process.env.REACT_APP_IMGBB_KEY;

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const resData = await response.json();

      return { isError: false, url: resData?.data?.display_url };
  } catch (error) {
    return { isError: true, msg: error };
  }
}
