import environment from "dotenv";
import UserServices from "../services/users";
import LanguageServices from "../services/language";
import EncryptPassword from "../helpers/Encryptor";
import response from "../helpers/response";
import GenerateToken from "../helpers/token";
import profileHelper from "../helpers/profile.helper";

environment.config();
class UserController {
  static async googleAndFacebookMobileSignIn(req, res) {
    const user = await UserServices.findUserByEmail(req.body.email);
    if (user == null) {
      const status = 404;
      return response.errorMessage(res, "Your Account is not created", status);
    }
    const token = GenerateToken({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      primaryLanguageId: user.primaryLanguageId,
      email: req.body.email,
      role: user.role,
      isVerified: user.isVerified,
    });
    await UserServices.updateUser(req.body.email, { token });
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: req.body.email,
      role: user.role,
      isVerified: user.isVerified,
      primaryLanguageId: user.primaryLanguageId,
      token,
    };
    return response.successMessage(
      res,
      "user has logged in successfully",
      200,
      data
    );
  }

  static async googleAndFacebookMobileSignUp(req, res) {
    const {
      firstName,
      lastName,
      email,
      authtype,
      profileImage,
      primaryLanguageId,
    } = req.body;
    const token = GenerateToken({
      lastName,
      firstName,
      email,
      primaryLanguageId,
      isVerified: true,
    });
    const userData = {
      firstName,
      lastName,
      email,
      authtype,
      profileImage,
      primaryLanguageId,
      isVerified: true,
      role: "standard",
      token,
    };
    const userCreated = await UserServices.findOrCreateUser(userData);
    const findLanguage = await LanguageServices.getLanguage(primaryLanguageId);
    return response.successMessage(res, "user created successfully", 201, {
      id: userCreated.id,
      firstName,
      lastName,
      email,
      primaryLanguage: findLanguage.name,
      isVerified: true,
      token,
    });
  }

  static async googleAndFacebookPlusAuth(
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    try {
      const userData = {
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value,
        authtype: profile.provider,
        profileImage: profile.photos[0].value,
        isVerified: true,
        role: "standard",
      };
      const [userCreated] = await UserServices.findOrCreateUser(userData);
      done(null, userCreated.dataValues);
    } catch (error) {
      done(error, false);
    }
  }

  static async authGoogleAndFacebook(req, res) {
    const {
      firstName,
      lastName,
      role,
      email,
      isVerified,
      id,
      authtype,
    } = req.user;
    const token = GenerateToken({
      firstName,
      lastName,
      role,
      email,
      isVerified,
      id,
    });
    await UserServices.updateUser(req.user.email, { token });
    let redirectUrl = "";
    const userToFind = await UserServices.findUserByEmail(req.user.email);
    const userInfo = JSON.stringify({ authtype, token });
    if (userToFind.dataValues.primaryLanguageId === null) {
      redirectUrl = `${process.env.FRONTEND_USER_PROFILE_REDIRECT}?info=${userInfo}`;
    } else {
      redirectUrl = `${process.env.FRONT_END_SUCCESS_REDIRECT}?info=${userInfo}`;
    }
    return res.redirect(redirectUrl);
  }
  static async updatedUser(req, res) {
    const activate = {
      isVerified: true,
    };
    const updateUser = await UserServices.activeUser(req.user.email, activate);

    if (updateUser.status === 200) {
      return res.redirect(`${process.env.FRONT_END_SUCCESS_REDIRECT}`);
    }

    return response.errorMessage(res, updateUser.message, updateUser.status);
  }
  static async logout(req, res) {
    await UserServices.updateUser(req.user.email, { token: null });
    return response.successMessage(
      res,
      "User is successfully logged out.",
      200
    );
  }

  static resetPassword(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return response.errorMessage(res, "Password does not match!", 400);
    }

    const data = {
      password: EncryptPassword(req.body.password),
    };
    UserServices.resetPassword(req, res, req.user.email, data);
  }
  static async editUserProfile(req, res) {
    const { email } = req.user;
    const profile = profileHelper.chooseProfileData(email, req.body);

    if (!req.user.isVerified === true) {
      const status = 401;
      return response.errorMessage(
        res,
        "User Is Not Verified, Please verify the User First",
        status
      );
    }
    UserServices.updateUser(email, profile);
    return response.successMessage(
      res,
      "User Profile are Updated",
      200,
      profile
    );
  }

  static async createGuestAccount(req, res) {

    try {
      const users = await UserServices.countUsers();
      const { primaryLanguageId } = req.body;
      const guestNumber = users.count+1;
      const email = "guest" + guestNumber + "@somafri.com";
      const role = "guest";
      const token = GenerateToken({
        role,
        email,
        isVerified: true,
        primaryLanguageId,
      }); 
      const data = {
        email,
        role,
        token,
        primaryLanguageId,
        isVerified: true,
        firstName:'somafriGuest',
        lastName:guestNumber
      };
     const createdUser= await UserServices.CreateUser(data);
      return response.successMessage(
        res,
        "Guest account was created successfully",
        201,
        {
          id:createdUser.dataValues.id,
          email,
          role,
          primaryLanguageId,
          token,
        }
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }

  }

  static async removeGuestsAccounts(req, res) {
    try {     
      await UserServices.removeGuestsAccounts();
      return response.successMessage(
        res,
        "All guests were deleted successfully",
        200,
      );
    } catch (error) {
      return response.errorMessage(res, error.message, 500);
    }

  }
}

export default UserController;
