export default function(DBTime) {
    let tzoffset = (new Date()).getTimezoneOffset() * 60000;
    let localISOTime = (new Date(new Date(DBTime) - tzoffset)).toISOString().slice(0, -1);
    return new Date(localISOTime);
};