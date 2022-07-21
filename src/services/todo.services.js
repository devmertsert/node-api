module.exports = {
    list: (req) => {
        return {
            code: 200,
            message: "All data fetched",
            status: "success",
            data: [
                { data: "first data" },
                { data: "second data" }
            ]
        }
    }
}