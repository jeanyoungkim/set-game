export default function generateRandomId() {
    return Math.random().toString(36).slice(-5);
}
