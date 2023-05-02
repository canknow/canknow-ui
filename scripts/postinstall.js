const env = process.env;
const ADBLOCK = is(env.ADBLOCK);
const CI = is(env.CI);
const DISABLE_OPENCOLLECTIVE = is(env.DISABLE_OPENCOLLECTIVE);

function is(it) {
  return !!it && it !== '0' && it !== 'false';
}

if (!ADBLOCK && !CI && !DISABLE_OPENCOLLECTIVE) {
  console.log('\n\x1B[89m>\x1B[93m ✌ welcome to canknow-ui ◕‿◕ \x1B[0m');
}