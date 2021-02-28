it('ainda sem testes', () => {
});

const getSomething = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(3)
    }, 3000)
  })
}

const system = () => {
  console.log('begin');
  getSomething().then(some => {
    console.log('Something is ' + some)
    console.log('end')
  })
}

system();