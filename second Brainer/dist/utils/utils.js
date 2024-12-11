"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const linkGenerator = (len) => {
    const hash = "abcdefghijklmnopqrstuvwxyz0123456789";
    let ans = "";
    for (let i = 0; i < len; i++) {
        ans += hash[Math.floor(Math.random() * hash.length)];
    }
    return ans;
};
exports.default = linkGenerator;
