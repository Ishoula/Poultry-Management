const SafeScreen = ({ children }) => {
  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        backgroundColor: Colors.light.background,
      }}
    >
      {children}
    </View>
  )
}