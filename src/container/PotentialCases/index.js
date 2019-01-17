/*
FileName: index.js
Author :Suraj Sanwal
Description: Contains the Potential cases component
Date : 13 december 2018
*/
import React, { Component } from "React";
import { View, StyleSheet, FlatList, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appAction from "../../actions";
import Header from "../../components/common/Header";
import Shifts from "../../components/shift";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";
import Constants from "../../constants";
import DivContainer from "../../components/common/DivContainer";

class PotientialCases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CaseID: null,
      currentIndex: [],
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
    let { currentIndex, loading, CaseID } = this.state;
    let skills = item.SkillsRequired && item.SkillsRequired.split(",");
    return (
      <Shifts
        key={index}
        skills={skills}
        patient={item}
        onSkillPress={skillIndex => {
          this.skillPress(index, skillIndex);
        }}
        showAll={_.findIndex(currentIndex, item => item === index) !== -1}
        isSelected={item.LikeIndicator}
        onLikePress={this.onIconPress}
        loading={loading}
        scheduleId={CaseID}
        blankView={false}
      />
    );
  };

  skillPress = (index, skillIndex) => {
    let { potientialCases } = this.props.schedule;
    let currentIndex = [...this.state.currentIndex];
    let skills =
      potientialCases[index].SkillsRequired &&
      potientialCases[index].SkillsRequired.split(",");
    if (skillIndex === 3) {
      let myindex = _.findIndex(currentIndex, item => item === index);
      if (myindex === -1) {
        currentIndex.push(index);
      }
      this.setState({ currentIndex });
      return;
    }
    if (skillIndex >= skills.length) {
      _.remove(currentIndex, item => item === index);
      this.setState({ currentIndex });
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
        <DivContainer hideFlex className={"flatListScroll"}>
          <FlatList
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
            numColumns={Platform.OS == "web" ? 2 : 1}
            ListEmptyComponent={
              <ListEmptyComponent
                message={" Potential Cases Not Found"}
                loader={app.refreshLoader || app.loading}
              />
            }
          />
        </DivContainer>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1,
    backgroundColor: Constants.Colors.White,
    ...Platform.select({
      web: {
        backgroundColor: Constants.Colors.BlueWhite
      }
    })
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
