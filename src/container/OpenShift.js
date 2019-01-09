import React, { Component } from "React";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appAction from "../actions";
import Header from "../components/common/Header";
// import UnderDevelopment from "../components/common/UnderDevelopment";
import PatientsCompo from "../components/patients/PatientsCompo";
import Filter from "../components/MySchedule/Filter";
import { moderateScale } from "../helpers/ResponsiveFonts";
import Constants from "../constants";

class OpenShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleId: null,
      showAll: false,
      currentIndex: null,
      loading: false,
      // prevDate: "04/24/2018",
      // nextDate: "05/01/2018"
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

  getLikeUpdate = loader => {
    let { prevDate, nextDate } = this.state;
    this.props.appAction.fetchOpenShift(prevDate, nextDate, loader);
    this.setState({ loading: false, scheduleId: null });
  };

  onIconPress = scheduleId => {
    this.setState(
      {
        loading: true,
        scheduleId
      },
      () => {
        this.props.appAction.openshiftsLike(scheduleId, () => {
          this.getLikeUpdate(false);
        });
      }
    );
  };

  onDateChange = (prevDate, nextDate) => {
    this.setState(
      {
        prevDate,
        nextDate
      },
      () => {
        this.getLikeUpdate();
      }
    );
  };

  render() {
    let { openShift } = this.props.schedule;
    let {
      showAll,
      currentIndex,
      prevDate,
      nextDate,
      loading,
      scheduleId
    } = this.state;
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
        {/* <UnderDevelopment /> */}
        {openShift.length ? (
          <FlatList
            // numColumns={Platform.OS === "web" ? 2 : 1}
            data={openShift}
            extraData={this.state}
            keyExtractor={item =>
              item.SchedID.toString() + Math.random().toString()
            }
            renderItem={({ item, index }) => {
              let skills =
                item.SkillsRequired && item.SkillsRequired.split(",");
              return (
                <PatientsCompo
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
                  scheduleId={scheduleId}
                />
              );
            }}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{ ...Constants.Fonts.Medium, fontSize: moderateScale(20) }}
            >
              No Shift Found
            </Text>
          </View>
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
  schedule: state.schedule
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenShift);
