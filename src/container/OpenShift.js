import React, { Component } from "React";
import { View, StyleSheet, FlatList } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from "moment";

import * as appAction from "../actions";
import Header from "../components/common/Header";
// import UnderDevelopment from "../components/common/UnderDevelopment";
import PatientsCompo from "../components/patients/PatientsCompo";
import Filter from "../components/MySchedule/Filter";

class OpenShift extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
      currentIndex: null,
      prevDate: "01/03/2018",
      nextDate: "12/27/2018"
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
    if (showAll && skillIndex === skills.length) {
      this.setState({ currentIndex: null, showAll: false });
      return;
    }
  };

  getLikeUpdate = () => {
    let { prevDate, nextDate } = this.state;
    this.props.appAction.fetchOpenShift(prevDate, nextDate);
  };

  onIconPress = scheduleId => {
    this.props.appAction.openshiftsLike(scheduleId, this.getLikeUpdate);
  };

  render() {
    let { openShift } = this.props.schedule;
    let { showAll, currentIndex, prevDate, nextDate } = this.state;
    return (
      <View style={Styles.containner}>
        <Header title={"Open Shift"} onDrawerPress={this.onDrawerPress} />
        <Filter
          prevDate={moment(prevDate).format("ddd DD MMMM")}
          nextDate={moment(nextDate).format("DD MMMM YYYY")}
          prevPress={() => {}}
          nextPress={() => {}}
        />
        {/* <UnderDevelopment /> */}
        <FlatList
          // numColumns={Platform.OS === "web" ? 2 : 1}
          data={openShift}
          extraData={this.state.showAll}
          keyExtractor={item =>
            item.SchedID.toString() + Math.random().toString()
          }
          renderItem={({ item, index }) => {
            let skills = item.SkillsRequired && item.SkillsRequired.split(",");
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
              />
            );
          }}
        />
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
