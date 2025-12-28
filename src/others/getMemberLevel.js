export const getMemberLevel = (count) => {
  if (count === "Unlimited") {
    return "High";
  } else {
    const members = Number(count);
    if (members >= 20) return "High";
    if (members >= 10) return "Medium";
    return "Low";
  }
};
