User = function (id, nick, profile, registeredIP, registeredTime) {
    this.id = id;
    this.nick = nick;
    this.profile = profile;
    this.registeredIP = registeredIP;
    this.registeredTime = registeredTime;
    this.lastVisit = {
        time: null,
        ip: null
    };
};

Profile = function (firstName, lastName, birthDate, sex) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthDate = birthDate;
    this.sex = sex;
};
