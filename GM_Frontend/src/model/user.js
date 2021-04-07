export default class User {
  constructor (
    username, 
    password,
    firstNameThai,
    lastNameThai,
    firstNameEng,
    lastNameEng,
    gender,
    citizenId,
    addressLine,
    subDistrict,
    district,
    province,
    country,
    postalCode,
    phoneNum,
    email,
    image,
    roleId
  ) {
      this.username = username;
      this.password = password;
      this.firstNameThai = firstNameThai;
      this.lastNameThai = lastNameThai;
      this.firstNameEng = firstNameEng;
      this.lastNameEng = lastNameEng;
      this.gender = gender;
      this.citizenId = citizenId;
      this.addressLine = addressLine;
      this.subDistrict = subDistrict;
      this.district = district;
      this.province = province;
      this.country = country;
      this.postalCode = postalCode;
      this.phoneNum = phoneNum;
      this.email = email;
      this.image = image;
      this.roleId = roleId;
    }
};