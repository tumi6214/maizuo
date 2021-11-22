const module = {
    namespaced: true,
    state: {
        isTabbarShow: true,
    },
    mutations: {
        changeTabbarShow(state, bool) {
            state.isTabbarShow = bool
        },
    },
    actions: {

    }
}

export default module