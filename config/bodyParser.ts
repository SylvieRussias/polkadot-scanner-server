import bodyParser from "body-parser";

export function urlEncodedNotExtended() {
    return bodyParser.urlencoded({ extended: false });
}

export function json() {
    return bodyParser.json();
}
