export default function formdata(method) {
	return async function(req) {
		let formData;

		try {
			formData = await req.formData();
		} catch(err) {
			const contentType = req.headers.get("Content-Type");

			// Specify that the request body is invalid and can't be parsed if the header is correct.
			if (contentType && contentType.includes("multipart/form-data")) {
				return new Response("The request body is invalid.", {
					status: 400
				});
			}

			// Otherwise, specify the required content type.
			return new Response("The request body should be of type 'multipart/form-data'!", {
				status: 400
			});
		}

		// Put the formData in the Request to be used by the method. This was done instead of passing
		// it as an argument to the method because middleware might be chained together ('method')
		// might come from another middleware which doesn't need the form data
		req.formData = formData;
		return await method(req);
	}
}
