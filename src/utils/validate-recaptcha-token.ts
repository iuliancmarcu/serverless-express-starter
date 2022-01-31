import { request } from 'undici';

async function validateRecaptchaToken(token: string) {
  const verifyUrl = process.env.RECAPTCHA_VERIFY_URL;
  const secret = process.env.RECAPTCHA_SECRET;

  const reCaptchaResponse = await request(verifyUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `secret=${secret}&response=${token}`,
  }).then((res) => res.body.json());

  return reCaptchaResponse.success;
}

export default validateRecaptchaToken;
