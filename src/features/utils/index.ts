export const limitStr = (str: string, limit: number) => {
    return !limit ? str : str.substr(0, limit) + '...';
}