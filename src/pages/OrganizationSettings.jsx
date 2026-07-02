import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrganizationSettings() {
  const navigate = useNavigate();

  const [website, setWebsite] =
    useState("https://www.techsolutions.com");

  const [email, setEmail] =
    useState("hr@techsolutions.com");

  const [recoveryEmail, setRecoveryEmail] =
    useState("");

  const [accountType] =
    useState("Employer");

  const [organizationId] =
    useState("ORG-2026-001");

  const [phone, setPhone] =
    useState("+91 9876543210");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [emailNotifications, setEmailNotifications] =
    useState(true);

  const [applicationAlerts, setApplicationAlerts] =
    useState(true);

  const handleSave = () => {
    const settings = {
  email,
  phone,
  recoveryEmail,
  website,
  emailNotifications,
  applicationAlerts,
};

    localStorage.setItem(
      "organizationSettings",
      JSON.stringify(settings)
    );

    alert("Settings Saved Successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-5xl mx-auto py-10 px-6">

        <button
          onClick={() =>
            navigate("/organization-dashboard")
          }
          className="text-blue-600 font-semibold mb-6"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold mb-2">
          Organization Settings
        </h1>

        <p className="text-gray-500 mb-8">
          Manage your organization profile and preferences.
        </p>

        <div className="bg-white rounded-2xl shadow-sm p-8 space-y-8">

          {/* Account Information */}

<div>

  <h2 className="text-2xl font-semibold mb-6">
    Account Information
  </h2>

  <div className="grid md:grid-cols-2 gap-5">

    {/* Contact Email */}

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Contact Email
      </label>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
    </div>

    {/* Phone */}

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Phone Number
      </label>

      <input
        type="text"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
    </div>

    {/* Recovery Email */}

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Recovery Email
      </label>

      <input
        type="email"
        value={recoveryEmail}
        onChange={(e) => setRecoveryEmail(e.target.value)}
        placeholder="recovery@example.com"
        className="w-full border p-3 rounded-xl"
      />
    </div>

    {/* Website */}

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Website
      </label>

      <input
        type="text"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        className="w-full border p-3 rounded-xl"
      />
    </div>

    {/* Account Type */}

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Account Type
      </label>

      <input
        type="text"
        value={accountType}
        readOnly
        className="w-full bg-gray-100 border p-3 rounded-xl cursor-not-allowed"
      />
    </div>

    {/* Organization ID */}

    <div>
      <label className="block text-sm font-medium text-gray-600 mb-2">
        Organization ID
      </label>

      <input
        type="text"
        value={organizationId}
        readOnly
        className="w-full bg-gray-100 border p-3 rounded-xl cursor-not-allowed"
      />
    </div>

  </div>

</div>

          {/* Security */}

          <div>

            <h2 className="text-2xl font-semibold mb-4">
              Security
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="New Password"
                className="border p-3 rounded-lg"
              />

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm Password"
                className="border p-3 rounded-lg"
              />

            </div>

          </div>

          {/* Notifications */}

          <div>

            <h2 className="text-2xl font-semibold mb-4">
              Notification Preferences
            </h2>

            <div className="space-y-3">

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() =>
                    setEmailNotifications(
                      !emailNotifications
                    )
                  }
                />

                Email Notifications

              </label>

              <label className="flex items-center gap-3">

                <input
                  type="checkbox"
                  checked={applicationAlerts}
                  onChange={() =>
                    setApplicationAlerts(
                      !applicationAlerts
                    )
                  }
                />

                Application Alerts

              </label>

            </div>

          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-4">

            <button
              className="px-6 py-3 border rounded-xl"
            >
              Reset
            </button>

            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl"
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default OrganizationSettings;