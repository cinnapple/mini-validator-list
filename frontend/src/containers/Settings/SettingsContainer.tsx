import * as React from "react";
import connect from "react-redux/es/connect/connect";
import * as actions from "../../store/actions/index";

import withNetworkHandler from "../../hoc/withNetworkHandler/withNetworkHandler";
import { t, res, i18nService } from "../../services/i18nService";

import Paper from "@material-ui/core/Paper";

import GenericList from "../../components/Common/GenericList";
import ToolbarLayout from "../../hoc/Layout/ToolbarLayout";
import ContentLayout from "../../hoc/Layout/ContentLayout";
import StackedListItem from "../../components/Common/StackedListItem";
import GenericDialog from "../../components/Dialog/GenericDialog";

const createLanguageOptions = () => {
  const langs = i18nService.getAvailableLanguages();
  return Object.keys(langs).map(key => ({
    primaryLabel: langs[key],
    value: key
  }));
};

const createThemeOptions = () => {
  return [
    {
      primaryLabel: t(res.THEME_LIGHT),
      value: "light"
    },
    {
      primaryLabel: t(res.THEME_DARK),
      value: "dark"
    }
  ];
};

const langItems = createLanguageOptions();
const themeItems = createThemeOptions();

class SettingsContainer extends React.Component<any, any> {
  state = {
    open: false,
    items: [],
    title: "",
    selected: "",
    onClick: undefined
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleLangChange = () => {
    this.setState({
      open: true,
      title: t(res.SETTINGS_LANGUAGE),
      items: langItems,
      selected: this.props.app.lang,
      onClick: this.props.onChangeLanguage
    });
  };

  handleThemeChange = () => {
    this.setState({
      open: true,
      title: t(res.SETTINGS_THEME),
      items: themeItems,
      selected: this.props.app.themeType,
      onClick: this.props.onChangeThemeType
    });
  };

  render() {
    const { app } = this.props;
    const { open, title, items, selected, onClick } = this.state;

    return (
      <React.Fragment>
        <ToolbarLayout title="Settings" />
        <ContentLayout>
          <Paper>
            <GenericList title={t(res.SETTINGS_APPEARANCE)}>
              <StackedListItem
                leftPrimaryLabel={t(res.SETTINGS_LANGUAGE)}
                rightPrimaryLabel={
                  langItems.find(o => o.value === app.lang).primaryLabel
                }
                onClick={this.handleLangChange}
              />
              <StackedListItem
                leftPrimaryLabel={t(res.SETTINGS_THEME)}
                rightPrimaryLabel={
                  themeItems.find(o => o.value === app.themeType).primaryLabel
                }
                onClick={this.handleThemeChange}
              />
            </GenericList>
          </Paper>
        </ContentLayout>
        <GenericDialog title={title} open={open} onClose={this.handleClose}>
          <GenericList>
            {items.map((item, i) => (
              <StackedListItem
                key={i}
                value={item.value}
                leftPrimaryLabel={item.primaryLabel}
                isChecked={item.value === selected}
                onClick={onClick}
              />
            ))}
          </GenericList>
        </GenericDialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    app: state.app
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onChangeLanguage: lang => dispatch(actions.setLanguage(lang)),
    onChangeThemeType: themeType =>
      dispatch(actions.toggleThemeType(themeType)),
    onDialogOpen: (title, items, selectedValue, handleSelect) =>
      dispatch(actions.openDialog(title, items, handleSelect, selectedValue))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withNetworkHandler(SettingsContainer));
