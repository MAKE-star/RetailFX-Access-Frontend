export type TBranchCreate = {
    branch_settle_id: string;
    branch_settle_book: string;
    branch_settle_code: string;
    branch_settle_name: string;
    branch_settle_currency: string;
    branch_settle_type: number;
    branch_settle_acct: string;
  };

export type TBranchEdit = {
    branch_settle_book: string;
    branch_settle_code: string;
    branch_settle_name: string;
    branch_settle_currency: string;
    branch_settle_type: number;
    branch_settle_acct: string;
  };
  
  export type TBranchList = {
    selectedItems: any;
    setSelectedItems: any;
    branchSettle: any;
  };