import db from "../database/models";
import {
  ForbiddenError,
  UserInputError,
  AuthenticationError,
} from "apollo-server";
import LanguageServices from "../services/language";
import mailer from '../helpers/send.email';
import axios from "axios";



const updatesResolvers = {

    Mutation: {
        updateUsers: async (
            root,
            { title, message},
            context,
            args
          ) => {

          const user = await context.user;
          if (user === null) {
            throw new ForbiddenError("Please provide token first");
          }
          if (user.role !== "admin") {
            throw new ForbiddenError(
              "you are not authorized to perform this task."
            );
          }
          try {
            const users = await db.user.findAll({
                include: [{
                  model: db.language,
                  include: [{
                    model: db.country,
                  }],
                }],
              });
              await Promise.all(
                users.map(async (client, index) => {
              const { email,lastName,primaryLanguageId } = client;
              const findLanguage = await LanguageServices.getLanguage(
                primaryLanguageId
              );              
              const PrimaryLanguageKey = findLanguage.language_key;
              const translateTitle = await axios.get(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${title}`
              );
              const translateMessage = await axios.get(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${PrimaryLanguageKey}&dt=t&q=${message}`
              );
                const messageTitle= translateTitle.data[0][0][0]
                const clientMessage= translateMessage.data[0][0][0]
              const emailView = await mailer.somaUpdateView(lastName,messageTitle,clientMessage);
              const sedEmail = await mailer.sendEmail(email, messageTitle, emailView);
              await db.somaUpdates.create({
                title,
                message:clientMessage,
                userEmail:client.email,
              });
            })
          );
          return 'users notified successfully'
          } catch (e) {
            throw new ForbiddenError(`${e.message}`);
          }
        },
    }    
}

export default updatesResolvers