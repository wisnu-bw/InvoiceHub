export const formatCurrency = (value: string) => {
    const numberValue = value.replace(/\D/g, "");
    return new Intl.NumberFormat("id-ID").format(parseFloat(numberValue) || 0);
  };
  