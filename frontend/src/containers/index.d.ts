declare namespace Containers {
  export type Dispatch<TProps> = (dispatch) => TProps;

  /**
   * Overview container
   */
  export type OverviewProps = {
    onInitValidators: (filter: Store.State.Filter) => void;
    onInitSummary: () => void;
    showNotification: (message: string, variant: string) => void;
  };

  /**
   * Validator container
   */
  export type ValidatorsProps = {
    onInitValidators?: () => void;
    onApplyFilter?: (filter: Store.State.Filter) => void;
    onResetFilter?: () => void;
    onUpdateValidators?: (date) => void;
    showNotification?: (message: string, variant: string) => void;
    onSelectItemPanelOpen?: (
      title: string,
      items,
      handleSelect: () => void
    ) => void;
    onDialogOpen?: (
      title: string,
      items,
      selectedValue: string,
      handleSelect: () => void
    ) => void;
  };
}
