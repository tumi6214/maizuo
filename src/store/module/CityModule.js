const module = {
    namespaced: true,   // 命名空间
    state: {
        cityId: "310100",
        cityName: "上海",
    },
    mutations: {
        changeCityId(state, id) {
            state.cityId = id
        },
        changeCityName(state, name) {
            state.cityName = name
        },
    },
    actions: {

    }
}

export default module