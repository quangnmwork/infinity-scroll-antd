import useSWRMutation from "swr/mutation";

const mockData = {
  data: new Array(900).fill(1).map((_, id) => ({
    historyDate: "11-Jan-2024 14:20:30",
    clubName: "Club name" + id,
    type: "WITHDRAW_REQUEST",
    qty: id * 3.2,
  })),
};

const getAPI = async (page: number) => {
  return new Promise((resolve, _) => {
    return setTimeout(
      () => resolve(mockData.data.slice(page, page + 10)),
      2000
    );
  });
};

const Mutidex = {
  getAPI,
};

export const useClubHistory = () => {
  const { error, isMutating, trigger } = useSWRMutation(
    "fetchClub",
    (_, { arg }: { arg: { page: number } }) => Mutidex.getAPI(arg.page),
    {}
  );

  return {
    error,
    isMutating,
    trigger,
  };
};
