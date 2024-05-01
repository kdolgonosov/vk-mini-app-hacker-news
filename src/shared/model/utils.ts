export const formatDate = (timestamp: EpochTimeStamp) => {
    return new Date(timestamp * 1000).toLocaleString();
};
