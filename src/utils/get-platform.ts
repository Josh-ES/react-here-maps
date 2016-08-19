let platform: any;

// return the current platform if there is one,
// otherwise open up a new platform
export function getPlatform(appId: string, appCode: string) {
    if (platform) return platform;

    platform = new H.service.Platform({
        'app_id': appId,
        'app_code': appCode,
    });

    return platform;
}

// make the getPlatform method the default export
export default getPlatform;
