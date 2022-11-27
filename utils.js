import readline from "readline";

export const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const isInt = (str) => {
    return /^[0-9+$]/.test(str);
};
