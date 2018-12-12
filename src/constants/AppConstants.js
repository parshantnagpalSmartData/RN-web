let AppCosntants = {
  AppName: "CIDR",
  Notificaitons: {
    Error: 1,
    Success: 2,
    Warning: 3
  },
  UserTypes: {
    Rider: "rider",
    Admin: "admin",
    Driver: "driver",
    SuperAdmin: "superAdmin"
  },
  Error: {
    serverError: "The server is not reachable right now, sorry for inconvenience."
  },
  UserLocation: {
    Source: "source",
    Destination: "destination"
  },
  RideStatus: {
    Request: "request",
    Accepted: "accepted",
    Completed: "completed",
    Cancelled: "cancelled",
    Rejected: "rejected",
    EnRoute: "enRoute",
    Arriving: "arriving",
    Arrived: "arrived",
    RatingRide: "ratingRide",
    RatingDriver: "ratingDriver"
  },
  TripIssue: {
    Issue: "issue",
    NoIssue: "noIssue"
  }
};

module.exports = AppCosntants;
