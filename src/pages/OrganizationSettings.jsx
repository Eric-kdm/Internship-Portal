import { useState } from "react";
import { useNavigate } from "react-router-dom";

function OrganizationSettings() {
  const navigate = useNavigate();

  const [organizationName, setOrganizationName] =
    useState("Tech Solutions Pvt Ltd");

  const [industry, setIndustry] =
    useState("Information Technology");

  const [website, setWebsite] =
    useState("https://www.techsolutions.com");

  const [email, setEmail] =
    useState("hr@techsolutions.com");

  const [phone, setPhone] =
    useState("+91 9876543210");

  const [description, setDescription] =
    useState("");

  const [logo, setLogo] =
    useState("");

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
      organizationName,
      industry,
      website,
      email,
      phone,
      description,
      logo,
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

          {/* Organization Details */}

          <div>

            <h2 className="text-2xl font-semibold mb-4">
              Organization Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">

              <input
                type="text"
                value={organizationName}
                onChange={(e) =>
                  setOrganizationName(e.target.value)
                }
                placeholder="Organization Name"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                value={industry}
                onChange={(e) =>
                  setIndustry(e.target.value)
                }
                placeholder="Industry"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                value={website}
                onChange={(e) =>
                  setWebsite(e.target.value)
                }
                placeholder="Website"
                className="border p-3 rounded-lg"
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Contact Email"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                placeholder="Phone Number"
                className="border p-3 rounded-lg"
              />

              <input
                type="text"
                value={logo}
                onChange={(e) =>
                  setLogo(e.target.value)
                }
                placeholder="Logo URL"
                className="border p-3 rounded-lg"
              />

            </div>

          </div>

          {/* Description */}

          <div>

            <h2 className="text-2xl font-semibold mb-4">
              Company Description
            </h2>

            <textarea
              rows="5"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              className="w-full border p-3 rounded-lg"
              placeholder="Describe your organization..."
            />

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
              Notifications
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