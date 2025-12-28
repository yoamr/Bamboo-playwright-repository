class EmailGenerator {
    
    static generateRandomEmail() {
        const timestamp = Date.now();
        return `user_${timestamp}@testmail.com`;
    }
}
// exports.module = { EmailGenerator }
module.exports = EmailGenerator;