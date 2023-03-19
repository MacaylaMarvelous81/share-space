import { Deta } from "deta";
import formdata from "@/lib/middleware/formdata";
import { randId } from "@/lib/rand";

const deta = Deta(process.env.DETA_PROJECT_KEY);
const videos = deta.Drive("videos");
const videoMeta = deta.Base("video-meta");

function checkRequiredFields(formData) {
	const file = formData.get("file");
	const title = formData.get("title");

	if (!file || typeof file !== "object" || typeof file.name !== "string") {
		return "file";
	}
	if (!title || typeof formData.get("title") !== "string") {
		return "title";
	}

	return "";
}

async function postEndpoint(req) {
	const invalid = checkRequiredFields(req.formData);
	if (invalid !== "") {
		return new Response(`Field ${ invalid } is invalid.`, {
			status: 400
		});
	}

	const file = req.formData.get("file");
	const title = req.formData.get("title");

	const fileExt = file.name.split(".").pop();
	if (fileExt !== "mp4") {
		return new Response("The video file must be an mp4 file.", {
			status: 400
		});
	}

	const videoId = randId();
	const fileName = videoId + ".mp4";
	const arrayBuf = await file.arrayBuffer();

	videos.put(fileName, {
		data: Buffer.from(arrayBuf),
		contentType: "video/mp4"
	});
	videoMeta.put({
		filename: fileName,
		title
	}, videoId);

	return new Response("Video upload has started.", {
		status: 202
	});
}

export const POST = formdata(postEndpoint);
