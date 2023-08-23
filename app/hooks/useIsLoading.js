const useIsLoading = (bool) => {
    localStorage.setItem('isLoading', bool) // записываем в локалстор, под ключ isLoading то значение, которое мы передаем
    window.dispatchEvent(new Event('storage')) // и вызываем этот эвент каждый раз, когда стор меняется
}

export default useIsLoading;