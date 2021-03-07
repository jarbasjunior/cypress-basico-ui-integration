it('Equality', () => {
  const a = 1
  const text = 'a'
  expect(a, 'It must be [' + a + ']').to.be.equal(1)
  expect(a, 'It must be [' + a + ']').not.to.be.equal(2)
  expect(text, 'It must be [' + text + ']').to.be.equal('a')
});

it('Truth', () => {
  const a = true
  const b = null
  const c = false
  let d
  expect(a, 'It must be [' + a + ']').to.be.true
  expect(b, 'It must be [' + b + ']').to.be.null
  expect(c, 'It must be [' + c + ']').to.be.false
  expect(d, 'It must be [' + d + ']').to.be.undefined
});

it('Object Equality', () => {
  const obj = {
    a: 1,
    b: 2
  }
  expect(obj).to.be.eql(obj)
  expect(obj).to.be.deep.eql(obj)
  expect(obj).to.be.include({a: 1})
  expect(obj).to.have.property('b')
  expect(obj).to.have.property('b', 2)
  expect(obj).not.to.be.empty
  expect({}).to.be.empty
});

it('Arrays', () => {
  const arr = [1,2,3]
  expect(arr, 'It must be [' + arr + ']').to.be.equal(arr)
  expect(arr).to.have.members([1,2,3])
  expect(arr).to.include.members([1,3])
  expect(arr).not.to.be.empty
  expect([]).to.be.empty
});

it('Types', () => {
  const num = 1
  const str = 'asd'
  const arr = []
  const obj = {}
  expect(num, 'Must be of the type [' + typeof num + ']').to.be.a('number')
  expect(str, 'Must be of the type [' + typeof str + ']').to.be.a('string')
  expect(arr, 'Must be of the type [' + typeof arr + ']').to.be.an('array')
  expect(obj, 'Must be of the type [' + typeof obj + ']').to.be.an('object')
});


it('String', () => {
  const str = 'String de teste'
  expect(str).to.be.equal('String de teste')
  expect(str).to.have.length(15)
  expect(str).to.contains('de')
  expect(str).to.match(/de/)
  expect(str).to.match(/^String/)
  expect(str).to.match(/teste$/)
  expect(str).to.match(/.{15}/)
  expect(str).to.match(/\w+/)
  expect(str).to.match(/\D+/)
});

it('Numbers', () => {
  const int = 4
  const float = 6.234

  expect(int, 'It must be [' + int + ']').to.be.equal(4)
  expect(int, 'It must be [' + int + ']').to.be.above(3)
  expect(int, 'It must be [' + int + ']').to.be.below(5)
  expect(float, 'It must be [' + float + ']').to.be.equal(6.234)
  expect(float, 'It must be [' + float + ']').to.be.closeTo(6.2, 0.1)
  expect(float, 'It must be [' + float + ']').to.be.above(6)
  expect(float, 'It must be [' + float + ']').to.be.below(6.3)
});
