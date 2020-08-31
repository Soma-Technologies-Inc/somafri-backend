
/**
 * This class contains functions for all user to update profile.
 */
class ProfileHelper {
  /**
 * service to choose profile to edit
 * @param {Object} email user request
 * @param {Object} userData user request
 * @returns {Object} return user message
 */
  static chooseProfileData(email, userData) {
    const {
      id,
      firstName,
      lastName,
      country,
      gender,
      birthdate,
      primaryLanguageId,
      profileImage,

    } = userData;
    return {
      id,
      email,
      firstName,
      lastName,
      country,
      gender,
      birthdate,
      primaryLanguageId,
      profileImage,

    };
  }
}
export default ProfileHelper;
