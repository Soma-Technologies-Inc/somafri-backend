import axios from 'axios';
import response from './response';
import mailer from './send.email';

class translate {
	static async translateMail(PrimaryLanguageKey) {
		const welcome = 'Welcome';

		const firstWord = " We're excited to have you get started. First, you need to confirm your account. Just press the button below.";
		const secondWord = ' If you have any questions, just reply to this email';
		const thrirdWord = "we're always happy to help out.";
		const fourthWord = 'Contact us ';
		const translateWelcm = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${welcome}`
		);

		const translateFirstWords = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${firstWord}`
		);

		const translateSecondWords = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${secondWord}`
		);

		const translateThrirdWords = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${thrirdWord}`
		);
		const translateFourthWords = await axios.get(
			`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${fourthWord}`
		);

		const translatedTitle = translateWelcm.data[0][0][0];
		const firstWords = translateFirstWords.data[0][0][0];
		const secondWords = translateSecondWords.data[0][0][0];
		const thrirdWords = translateThrirdWords.data[0][0][0];
		const fourthWords = translateFourthWords.data[0][0][0];

		const result = {
			translatedTitle,
			firstWords,
			secondWords,
			thrirdWords,
			fourthWords
		};

		return result;
	}
}
export default translate;
