/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the Potential cases component
Date : 13 december 2018
*/
import React, { Component } from "React";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Shifts from "../components/shift/Shifts";
import * as appAction from "../actions";
import Header from "../components/common/Header";
import Constants from "../constants";
import { moderateScale } from "../helpers/ResponsiveFonts";

class PotientialCases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CaseID: null,
      showAll: false,
      currentIndex: null,
      loading: false,
      page: 1
    };
  }

  componentDidMount() {
    this.fetchPotientialCases();
  }

  fetchPotientialCases = (refreshLoader = false) => {
    this.props.appAction.fetchPotientialCases(this.state.page, refreshLoader);
  };

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  onIconPress = CaseID => {
    this.setState(
      {
        loading: true,
        CaseID
      },
      () => {
        this.props.appAction.potientialCasesLike(CaseID, () =>
          this.setState({ loading: false, CaseID: null })
        );
      }
    );
  };

  renderItem = ({ item, index }) => {
    let { showAll, currentIndex, loading, CaseID } = this.state;
    let skills = item.SkillsRequired && item.SkillsRequired.split(",");
    return (
      <Shifts
        key={index}
        skills={skills}
        patient={item}
        onSkillPress={skillIndex => {
          this.skillPress(index, skillIndex);
        }}
        showAll={index === currentIndex && showAll}
        isSelected={item.LikeIndicator}
        onLikePress={this.onIconPress}
        loading={loading}
        scheduleId={CaseID}
      />
    );
  };

  skillPress = (index, skillIndex) => {
    let { showAll } = this.state;
    let { openShift } = this.props.schedule;
    let skills =
      openShift[index].SkillsRequired &&
      openShift[index].SkillsRequired.split(",");
    if (skillIndex === 3) {
      this.setState({ currentIndex: index, showAll: true });
      return;
    }
    if (showAll && skillIndex === skills.length + 1) {
      this.setState({ currentIndex: null, showAll: false });
      return;
    }
  };

  onCurrentPageEndReach = () => {
    let {
      schedule: { potientialCasesMeta }
    } = this.props;
    let { page } = this.state;
    if (page < potientialCasesMeta.totalPages) {
      this.setState({ page: page + 1 }, () => this.fetchPotientialCases(true));
    }
  };

  onRefresh = () => {
    this.setState({ page: 1 }, () => this.fetchPotientialCases(true));
  };

  render() {
    let { schedule, app } = this.props;
    let { potientialCases } = schedule;
    return (
      <View style={Styles.containner}>
        <Header title={"Potiential Cases"} onDrawerPress={this.onDrawerPress} />
        {!app.loading && !app.refreshLoader && !potientialCases.length ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Text
              style={{
                ...Constants.Fonts.Medium,
                fontSize: moderateScale(20)
              }}
            >
              Potential Cases Not Found
            </Text>
          </View>
        ) : (
          <FlatList
            // numColumns={Platform.OS === "web" ? 2 : 1}
            data={potientialCases}
            extraData={this.state}
            keyExtractor={item =>
              item.CaseID.toString() + Math.random().toString()
            }
            refreshing={app.refreshLoader}
            onRefresh={this.onRefresh}
            renderItem={this.renderItem}
            onEndReached={this.onCurrentPageEndReach}
            onEndReachedThreshold={0}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  schedule: state.schedule
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PotientialCases);
