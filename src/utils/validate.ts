export function parseIdParam(param: string | string[] | undefined): number | null {
    if (typeof param !== 'string') {
        return null;
    }

    const parsed = parseInt(param, 10);
    if (isNaN(parsed)) {
        return null;
    }

    return parsed;
}
