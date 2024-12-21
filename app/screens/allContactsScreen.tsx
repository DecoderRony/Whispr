import { useEffect, useState } from "react";
import Contacts from "react-native-contacts";
import { StyleSheet } from "react-native";
import { Avatar, Divider, List } from "react-native-paper";
import { findUserByPhoneNumbers } from "../services/userService";
import { NavigationsProps, UserDetails } from "../types/types";
import { Contact } from "react-native-contacts/type";

const styles = StyleSheet.create({
  listContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

// contactsMeta contain multiple details regarding a user fetched from native contact list
// phone numbers are spit with spaces(ex: 1234 5678)
// this method reads the phone numbers array for a contact removes spaces and joins the phone number and return the sanitized numbers.
const getPhoneNumbers = (contactsMeta: Contact[]) => {
  return contactsMeta.map((contact) => {
    return contact.phoneNumbers.map((numberDetails) =>
      numberDetails.number.split(" ").join("")
    );
  });
};

export default function AllContactsScreen() {
  const [contacts, setContacts] = useState<UserDetails[]>([]);

  const fetchContacts = async () => {
    const contactsMeta = await Contacts.getAll();
    const phoneNumberList = getPhoneNumbers(contactsMeta);

    const user = await Promise.all(
      phoneNumberList.map((phoneNumbers) =>
        findUserByPhoneNumbers(phoneNumbers)
      )
    );

    const sanitizedUser = user.filter((user) => user) as UserDetails[];
    setContacts((prev) => [...prev, ...sanitizedUser]);
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      if (isMounted) {
        await fetchContacts();
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <List.Section style={styles.listContainer}>
      {contacts?.map((contact, index) => (
        <>
          <List.Item
            key={contact.uid}
            title={contact.fullName}
            description={contact.about}
            left={() => (
              <Avatar.Image size={50} source={{ uri: contact.dp as string }} />
            )}
          />

          <Divider key={contact.uid + index} />
        </>
      ))}
    </List.Section>
  );
}
