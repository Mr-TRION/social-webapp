import axios from "axios";

const uploadPic = async media => {
    try {
        const form = new FormData();
        form.append("file", media);
        form.append("upload_preset", "Social_media_app");
        form.append("cloud_name", "dkfwvn7jg");

        const res = await axios.post(process.env.CLOUDINARY_URL, form);
        return res.data.url;
    } catch (error) {
        return;
    }
};

export default uploadPic;