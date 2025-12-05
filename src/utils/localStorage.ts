export function estimateLocalStorageUsage() {
    if (typeof window === 'undefined') return 0;

    let total = 0;

    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += localStorage[key].length + key.length;
        }
    }

    // Convert bytes to megabytes.
    total /= 1024 * 1024;
    return total;
}