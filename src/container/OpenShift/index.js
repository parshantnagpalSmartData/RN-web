/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the OpenShift component
Date : 13 december 2018
*/

import React, { Component } from "React";
import { View, StyleSheet, FlatList, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";
import _ from "lodash";

import * as appAction from "../../actions";
import Header from "../../components/common/Header";
import Shifts from "../../components/shift";
import Filter from "../../components/MySchedule/Filter";
import ListEmptyComponent from "../../components/common/ListEmptyComponent";
import Constants from "../../constants";
import DivContainer from "../../components/common/DivContainer";
// import { moderateScale } from "../../helpers/ResponsiveFonts";

class OpenShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: null,
      currentIndex: [],
      loading: false,
      page: 1,
      prevDate: moment().format("MM/DD/YYYY"),
      nextDate: moment()
        .add(7, "d")
        .format("MM/DD/YYYY")
    };
  }

  componentDidMount() {
    this.getLikeUpdate();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  skillPress = (index, skillIndex) => {
    let currentIndex = [...this.state.currentIndex];
    let { openShift } = this.props.schedule;
    let skills =
      openShift[index].SkillsRequired &&
      openShift[index].SkillsRequired.split(",");
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

  getLikeUpdate = (refresh = false) => {
    let { prevDate, nextDate, page } = this.state;
    this.props.appAction.fetchOpenShift(page, prevDate, nextDate, refresh);
  };

  onIconPress = scheduleId => {
    this.setState(
      {
        loading: true,
        scheduleId
      },
      () => {
        this.props.appAction.openshiftsLike(scheduleId, () =>
          this.setState({ loading: false, scheduleId: null })
        );
      }
    );
  };

  onDateChange = (prevDate, nextDate) => {
    this.setState(
      {
        prevDate,
        nextDate,
        currentIndex: []
      },
      () => {
        this.getLikeUpdate();
      }
    );
  };

  onCurrentPageEndReach = () => {
    let {
      schedule: { openShiftMeta }
    } = this.props;
    let { page } = this.state;
    if (page < openShiftMeta.totalPages) {
      this.setState({ page: page + 1 }, () => this.getLikeUpdate(true));
    }
  };

  onRefresh = () => {
    this.setState({ page: 1 }, () => this.getLikeUpdate(true));
  };

  renderItem = ({ item, index }) => {
    let { currentIndex, loading, scheduleId } = this.state;
    let skills = item.SkillsRequired && item.SkillsRequired.split(",");
    return (
      <DivContainer
        className={"mainView"}
        style={
          {
            // justifyContent:"center",
            // alignItem:'center'
          }
        }
      >
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
          scheduleId={scheduleId}
          blankView={true}
        />
      </DivContainer>
    );
  };

  render() {
    let { app, schedule } = this.props;
    let { openShift } = schedule;
    let { prevDate, nextDate } = this.state;
    return (
      <View style={Styles.containner}>
        <Header title={"Open Shift"} onDrawerPress={this.onDrawerPress} />
        <Filter
          prevDate={new Date(prevDate)}
          nextDate={new Date(nextDate)}
          onDateChange={(prevDate, nextDate) =>
            this.onDateChange(prevDate, nextDate)
          }
        />
        <DivContainer hideFlex className={"flatListScroll"}>
          <FlatList
            // horizontal
            // contentContainerStyle={{
            //   flex: 1,
            //   flexWrap: "wrap",
            //   flexDirection: "row",
            //   justifyContent: "flex-start",
            //   width:"100%"
            // }}
            data={openShift}
            extraData={this.state}
            keyExtractor={item =>
              item.SchedID.toString() + Math.random().toString()
            }
            refreshing={app.refreshLoader}
            onRefresh={this.onRefresh}
            renderItem={this.renderItem}
            onEndReached={this.onCurrentPageEndReach}
            onEndReachedThreshold={0}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={
              Platform.OS == "web" && Constants.BaseStyle.DEVICE_WIDTH > 992
                ? 2
                : 1
            }
            ListEmptyComponent={
              <ListEmptyComponent
                message={"Shift Not Found!"}
                loader={app.refreshLoader || app.loading}
              />
            }
            // columnWrapperStyle={Styles.columnWrapperStyle}
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
  },
  columnWrapperStyle: {
    backgroundColor: "green"
  }
});

const mapStateToProps = state => ({
  schedule: state.schedule,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenShift);
