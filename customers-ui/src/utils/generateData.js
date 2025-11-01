const firstNames = [
  "Aarav","Vivaan","Aditya","Vihaan","Arjun","Kabir","Ishaan","Ananya","Aditi","Diya","Rohan","Karan","Sneha","Deepa","Pooja","Vikram","Riya","Sanjay","Priya","Kavya"
];
const lastNames = [
  "Sharma","Verma","Gupta","Patel","Sinha","Reddy","Nair","Das","Khan","Singh","Kapoor","Mehta","Chaudhary","Ghosh","Bose","Kaur"
];

function randomInt(max) {
  return Math.floor(Math.random() * max);
}
function randomFrom(arr) {
  return arr[randomInt(arr.length)];
}

function makeName(i) {
  return `${randomFrom(firstNames)} ${randomFrom(lastNames)} ${i % 1000}`;
}
function makePhone(i) {
  const n = 9000000000 + (i % 1000000000);
  return `${n}`.slice(0, 10);
}
function makeEmail(name, i) {
  const base = name.toLowerCase().replace(/\s+/g, ".");
  return `${base}.${i}@example.com`;
}
function makeAvatar(name) {
  const parts = name.split(" ");
  const initials = parts.map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return initials;
}

export function generateData(total = 1_000_000) {
  const arr = new Array(total);
  for (let i = 0; i < total; i++) {
    const name = makeName(i);
    const phone = makePhone(i);
    arr[i] = {
      id: i + 1,
      name,
      phone,
      email: makeEmail(name, i),
      score: Math.floor(Math.random() * 100),
      lastMessageAt: Date.now() - (i % 100000) * 1000,
      addedBy: `user${(i % 50) + 1}`,
      avatar: makeAvatar(name),
    };
  }
  return arr;
}
