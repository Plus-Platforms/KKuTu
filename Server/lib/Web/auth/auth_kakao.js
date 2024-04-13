const config = require('../../sub/auth.json');

module.exports.config = {
    strategy: require('passport-kakao').Strategy,
    color: '#FFDE00',
    fontColor: '#3C1E1E',
    vendor: 'kakao',
    displayName: 'withKakao'
}

module.exports.strategyConfig = {
    clientID: config.kakao.clientID, // 보안을 위해서입니다.
    clientSecret: config.kakao.clientSecret,
    callbackURL: config.kakao.callbackURL,  // 이 방법을 사용하는 것을
    passReqToCallback: true,  // 적극 권장합니다.
	scope: [ "profile_nickname", "profile_image" ]
}

module.exports.strategy = (process, MainDB, Ajae) => {
    return (req, accessToken, refreshToken, profile, done) => {
        const $p = {};

        $p.authType = "kakao";
        $p.id = profile.id.toString();
        $p.name = "닉네임 없음";
        $p.title = "닉네임 없음";
        $p.image = profile._json.properties.profile_image;

        process(req, accessToken, MainDB, $p, done);
    }
}